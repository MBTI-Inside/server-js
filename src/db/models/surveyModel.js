import { model } from 'mongoose';
import { surveySchema } from '../schemas/index.js';

const Survey = model('Survey', surveySchema);

/**
 * 직접적으로 DB와 통신을 담당하는 객체. DAO: Data Access Object
 * Persistence layer에 속하며, 바로 위 계층인 Business layer에 속하는 service 객체와 소통(서비스 객체가 DAO객체를 호출)을 한다.
 * DAO 객체는 자신이 어떤 DB와 데이터를 주고 받는지를 인지하고 있다.
 * 데이터 송수신 총 책임자 역할이다. 레스토랑에서 "재료 조달 관리자"와 같은 위치.
 * DAO 객체 덕분에 service 객체는 본인이 "어떤 DB에서 데이터를 CRUD하는지" 알 필요가 없어졌다.
 * 해당 내용은 모두 DAO가 담당하기 때문에 service 객체는 DAO가 제공해주는 메소드를 활용해서 필요한 데이터를 다루면 된다.
 * 레스토랑의 비유를 들자면 service 객체는 쉐프,
 * DAO 객체는 조달처로부터 재료를 조달하고 관리하는 "재료 조달 관리자".
 * 쉐프는 재료 관리자를 믿고 제공된 재료로 요리를 하고 재료 관리자는 책임지고 양질의 재료를 가져온다.
 */
class SurveyModel {
  /**
   * 쿼리 메소드 마지막에 lean 메소드를 불러주면(chaining해주면) POJO 객체를 리턴해준다.
   * Document class가 필요하지 않으면 lean을 호출하는 것이 성능상 좋다.
   * 하지만 lean 사용 시 몇 가지 기능이 유실된다.
   * 링크 {@link https://mongoosejs.com/docs/tutorials/lean.html}
   */

  // 문항 document 객체 전체를 찾아오는 메소드
  findSurveys(searchInfo) {
    const { limit, skip, search } = searchInfo;

    return Survey.find(search)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // lean을 사용하여 POJO 객체로 바꿔준다.
  }

  // 특정 id를 _id로 갖는 문항 document 객체를 찾아오는 메소드
  findById(id) {
    return Survey.findById(
      id // document의 id, mongoDB에 저장된 _id에 저장된 값이다.
    ).lean(); // lean을 사용하여 POJO 객체로 바꿔준다.
  }

  findMbtiSurveys() {
    // TODO: MBTI 유형 및 문항 숫자가 하드코딩되어 있음. 바꿀 수 있어야 한다.
    // cf) 사용자가 어떤 유형에 대해서만 검사할 것인지를 먼저 판단하고, 몇 문항씩 테스트할 지를 판단 후 데이터를 입력해서 테스트할 수 있게 한다면?
    // ex) 사용자는 T, F에 대한 유형검사만 10문항에 대해서 진행하고 싶다. 그럼 judgement 키워드와, size는 10을 입력하면 그 데이터만 표시하게 된다.
    return Survey.aggregate([
      {
        $facet: {
          energy: [
            { $match: { mbtiType: 'energy' } },
            { $sample: { size: 4 } }
          ],
          awareness: [
            { $match: { mbtiType: 'awareness' } },
            { $sample: { size: 4 } }
          ],
          judgement: [
            { $match: { mbtiType: 'judgement' } },
            { $sample: { size: 4 } }
          ],
          life: [{ $match: { mbtiType: 'life' } }, { $sample: { size: 4 } }]
        }
      },
      // $facet의 결과를 합치는 단계
      {
        $project: {
          combined: {
            $concatArrays: ['$energy', '$awareness', '$life', '$judgement']
          }
        }
      },
      // combined 배열을 풀어내는 단계
      { $unwind: '$combined' },
      // 필요한 필드만 선택
      { $replaceRoot: { newRoot: '$combined' } }
    ]);
  }

  // 새로운 문항 document 객체를 생성하여 mongoDB에 저장하는 메소드
  create(survey) {
    // 생성된 객체는 값만 있는 non-POJO 객체이다. toObject를 이용해서 POJO 객체로 바꿔준다.
    return Survey.create(survey).then((doc) => doc.toObject());
  }

  // 특정 id를 _id로 갖고 있는 문항 document를 toUpdate 객체의 내용으로 덮어 씌운다(overwrite).
  // 덮어 씌우는 것이기 때문에 잘못된 값이 의도치 않게 들어가면 문제가 발생할 수 있다.
  update(id, board) {
    const updatedSurvey = Survey.findByIdAndUpdate(
      id, // document의 id, mongoDB에 저장된 _id에 저장된 값이다.
      board,
      {
        runValidators: true, // schema 체크(업데이트 될 데이터에 대한 검증)를 진행한다.
        new: true // 업데이트 후의 document를 리턴받도록 한다.
      }
    ).lean(); // lean을 사용하여 POJO 객체로 바꿔준다.
    return updatedSurvey;
  }

  // 특정 id를 _id로 갖고 있는 문항 document를 삭제한다(hard delete).
  delete(id) {
    return Survey.findByIdAndDelete(
      id // document의 id, mongoDB에 저장된 _id에 저장된 값이다.
    ).lean(); // lean을 사용하여 POJO 객체로 바꿔준다.
  }
}

export default SurveyModel;
