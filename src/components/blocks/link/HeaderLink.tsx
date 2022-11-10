import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IHeaderLinkProps } from './type';

const HeaderLink: FC<IHeaderLinkProps> = observer(({ text, to }) => {
  return (
    <Link
      to={to}
      className='header__nav-link'
    >
      {text}
    </Link>
  );
});

export default HeaderLink;
