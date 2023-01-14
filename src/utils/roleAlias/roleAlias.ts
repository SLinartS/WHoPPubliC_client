import { TUserRole } from '../../store/state/type';

interface IAliasRole {
  role: TUserRole;
  alias: string;
}

const ALIAS_ROLE: IAliasRole[] = [
  { role: 'admin', alias: 'Администратор' },
  { role: 'operator', alias: 'Оператор' },
  { role: 'worker', alias: 'Рабочий' },
];

export function roleAlias(role: TUserRole) {
  return ALIAS_ROLE.find((aliasRole) => aliasRole.role === role)!.alias;
}
