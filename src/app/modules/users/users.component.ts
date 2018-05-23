import { Component, OnInit, } from '@angular/core';
import * as jquery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { userConfiguration } from '../user.configuration';
import { ModalSize } from '../../shared/ui-common/modal/components/dialog.component';
import { ExDialog } from '../../shared/ui-common/modal/services/ex-dialog.service';

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
     public imagePath = 'https://placehold.it/100x100';
     constructor(
          private router: Router,
          private route: ActivatedRoute,
          private exDialog: ExDialog) { }

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

     showConfirm() {
          this.exDialog.openConfirm('User "hieutran" will be permanently deleted. Are you sure want to delete?',
               'Confirm', ModalSize.Normal)
               .subscribe(result => {
                    if (result) {
                         alert('Submited');
                    }
               });
     }

     showEditUserGroup() {
          this.exDialog.openConfirm('Edit user group dialog', 'Navigate to edit user group page?', ModalSize.Normal).subscribe(result => {
               if (result) {
                    alert('you clicked Submit button');
               }
          });
     }

     navigateToCreatePage() {
          this.router.navigate([userConfiguration.createPageUrl], { relativeTo: this.route });
     }

     navigateToEditPage() {
          this.router.navigate([userConfiguration.editUserPageUrl], { relativeTo: this.route });
     }

     navigateToUserDetailPage() {
          this.router.navigate([userConfiguration.userDetailPage], { relativeTo: this.route });
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

          // const table = $('#datatables').DataTable();


          // // Edit record
          // table.on('click', '.edit', function () {
          //      const $tr = $(this).closest('tr');

          //      const data = table.row($tr).data();
          //      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
          // });

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
