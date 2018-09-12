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
export class PosComponent extends AbstractBaseComponent implements OnInit {

  filterEventArgs: IFilterChangedEvent;
  poses: POSDto[] = [];

  constructor(private readonly posService: POSService) {
    super();

  }

  ngOnInit() {
    this.getPoses();
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
  }

  synchronize() {
    this.posService.synchronize().subscribe(() => {
      this.getPoses();
    });
  }
}
