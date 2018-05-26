import { Component, OnInit, } from '@angular/core';
import * as jquery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { USER_CONFIGURATION } from '../user.configuration';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public dataTable: DataTable;
    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.dataTable = {
            headerRow: ['Full Name', 'Username', 'Login Details', 'Group Name', 'Status', 'Actions'],
            footerRow: [],

            dataRows: [
                ['Airi Satou', 'Andrew Mike', 'Develop', '2013', 'success'],
                ['Angelica Ramos', 'John Doe', 'Design', '2012', 'danger'],
            ]
        };
    }

    getUserInfomation() { }

    editUserGroup() {
    }

    navigateToCreatePage() {
        this.router.navigate([USER_CONFIGURATION.CREATE_USER_PAGE], { relativeTo: this.route });
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search by username, fullname or email',
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            const $tr = $(this).closest('tr');

            const data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // // Delete a record
        // table.on('click', '.remove', function (e) {
        //      const $tr = $(this).closest('tr');
        //      table.row($tr).remove().draw();
        //      e.preventDefault();
        // });

        // // Like record
        // table.on('click', '.like', function () {
        //      alert('You clicked on Like button');
        // });

        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
