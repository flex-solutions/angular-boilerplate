import { MemberTypeService } from './../../services/member-type.service';
import { MemberType } from './../../../../shared/models/member-type.model';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-member-type-home',
  templateUrl: './member-type.component.html',
  styleUrls: ['member-type.component.css']
})
export class MemberTypeHomeComponent implements OnInit {

  public memberTypes: MemberType[] = [];

  constructor(private readonly memberTypeService: MemberTypeService) {
  }

  ngOnInit() {
    this.getMemberTypes();
  }

  createNewMemberType() {

  }

  editMemberType(id: string) {

  }

  deleteMemberType(id: string) {

  }

  private getMemberTypes() {
    this.memberTypeService.getMemberTypes().subscribe(memberTypes => {
      this.memberTypes = memberTypes;
    });
  }
}
