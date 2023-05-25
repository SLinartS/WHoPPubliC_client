import { TStatus } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import Loader from '../Loader';

interface ILoaderWrapperProps {
  status: TStatus;
  children: ReactNode;
}

const LoaderWrapper: FC<ILoaderWrapperProps> = ({ status, children }) => {
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'error') {
    return <Loader isError />;
  }
  /* eslint-disable-next-line react/jsx-no-useless-fragment */
  return <>{children}</>;
};

export default observer(LoaderWrapper);
