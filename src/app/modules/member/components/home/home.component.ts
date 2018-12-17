import { MemberRouteNames } from '../../constants/member.constants';
import { MemberService } from '../../services/member.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MemberModel, MemberFilter } from '../../../../shared/models/member.model';
import { IFilterChangedEvent, DatagridComponent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { MemberCriteriaBuilder } from '../member-filter/member-filter.builder';
import { parseStringToBoolean } from '../../../../utilities/util';

@Component({
    selector: 'app-member-home',
    templateUrl: './home.component.html'
})
export class MemberHomeComponent implements OnInit {
    filter: IFilterChangedEvent;
    members: MemberModel[] = [];
    memberFilter: MemberFilter = new MemberFilter();
    @ViewChild(DatagridComponent)
    dataGrid: DatagridComponent;

    private _canAddOrUpdateMember = true;
    private _isHideFilterControl = false;

    @Input()
    set canAddOrUpdateMember(val) {
        this._canAddOrUpdateMember = parseStringToBoolean(val);
    }
    get canAddOrUpdateMember() {
        return this._canAddOrUpdateMember;
    }

    @Input()
    set isHideFilterControl(val) {
        this._isHideFilterControl = val;
    }
    get isHideFilterControl() {
        return this._isHideFilterControl;
    }

    constructor(private memberService: MemberService, private route: Router) {}

    public count = (searchKey: string): Observable<number> => {
        return this.memberService.count(this.getFilterQuery());
    };

    createNewMember() {
        this.route.navigate([MemberRouteNames.CREATE]);
    }

    editMember(id: string) {
        this.route.navigate([`${MemberRouteNames.EDIT}/${id}`]);
    }
    ngOnInit(): void {}

    onPageChanged(event: IFilterChangedEvent) {
        this.filter = event;
        this.getMembers();
    }

    onRunFilterClicked() {
        this.loadData();
    }

    getFilterQuery() {
        const query = MemberCriteriaBuilder.build(this.memberFilter);
        return query;
    }

    private getMembers() {
        this.memberService
            .getMembers(this.filter.pagination.page, this.filter.pagination.itemsPerPage, this.getFilterQuery())
            .subscribe(res => {
                this.members = res;
            });
    }

    loadData() {
        this.count('').subscribe(total => {
            this.dataGrid.totalItems = +total;
            this.dataGrid.countPageEntry();
            this.getMembers();
        });
    }

    resetFilter = () => {
        Object.assign(this.memberFilter, new MemberFilter());
        this.loadData();
    };

    navigateToFilterMember(member) {
        // TODO: Implement in the feature
    }
}
