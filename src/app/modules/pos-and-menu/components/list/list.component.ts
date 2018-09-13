import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { AbstractBaseComponent } from '../../../../shared/abstract/abstract-base-component';
import { IFilterChangedEvent } from '../../../../shared/ui-common/datagrid/components/datagrid.component';
import { Observable } from 'rxjs';
import { POSService } from '../../services/pos';
import { POSDto } from '../../../../shared/models/pos.model';

@Component({
  moduleId: module.id,
  selector: 'app-pos',
  templateUrl: './list.component.html',
})
export class POSComponent extends AbstractBaseComponent implements OnInit {

  filterEventArgs: IFilterChangedEvent;
  poses: POSDto[] = [];

  constructor(private readonly posService: POSService,
    private readonly router: Router) {
    super();
  }

  ngOnInit() {
  }

  private getPoses() {
    this.posService.find(this.filterEventArgs.pagination.itemsPerPage,
      this.filterEventArgs.pagination.page,
      this.filterEventArgs.searchKey).subscribe(res => {
        this.poses = res;
    });
  }

  public count = (searchKey: string): Observable<number> => {
    return this.posService.count(searchKey);
  }

  onPageChanged(eventArg: IFilterChangedEvent) {
    this.filterEventArgs = eventArg;
    this.getPoses();
  }

  synchronize() {
    this.posService.synchronize().subscribe(() => {
      this.getPoses();
    });
  }

  editPos(pos: POSDto) {
    this.router.navigate([`pos/update/${pos._id}`]);
  }
}
