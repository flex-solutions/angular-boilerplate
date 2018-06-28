import { TranslateService } from './../services/translate.service';

enum Sex {
  Female = 0,
  Male,
  Other
}
class SexModel {
  id: Sex;
  name: string;

  constructor(inputId: Sex, inputName: string) {
    this.id = inputId;
    this.name = inputName;
  }
}

const sexWomanTranslate = 'sex-woman';
const sexManTranslate = 'sex-man';
const sexOtherTranslate = 'sex-other';

class SexList {
  private static SexList: SexModel[] = [];

  static getInstance(translateService: TranslateService): any {
    if (this.SexList.length === 0) {
      this.SexList = [
        new SexModel(Sex.Female, translateService.translate(sexWomanTranslate)),
        new SexModel(Sex.Male, translateService.translate(sexManTranslate)),
        new SexModel(Sex.Other, translateService.translate(sexOtherTranslate)),
      ]
    }
    return this.SexList;
  }
}



class CustomerModel {
  _id: any;
  phoneNumber: string;
  memberId: string;
  name: string;
  birthday: Date;
  sex: Sex;
  address: string;
  customerType: number;
}

export { CustomerModel, Sex, SexList, SexModel};
