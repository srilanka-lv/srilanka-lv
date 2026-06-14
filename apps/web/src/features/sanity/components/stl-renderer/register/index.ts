import { registerRenderer } from 'structured-table';

import TableView from '../table/table-view';

registerRenderer('react', {
  Table: TableView,
});
