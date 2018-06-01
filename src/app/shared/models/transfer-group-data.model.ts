import { UserGroup } from './user-group.model';
import { IFilterChangedEvent } from '../ui-common/datagrid/components/datagrid.component';

export class TransferGroupData {
     userId: string;
     userName: string;
     groupId: string;
     filterEvent: IFilterChangedEvent;
}
