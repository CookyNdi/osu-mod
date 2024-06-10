import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type LoadingAnimationProps = {
  isLoading: boolean;
};

const override: CSSProperties = {
  display: 'block',
};

export default function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  return (
    <div>
      <ClipLoader
        color={'#F8FAFC'}
        loading={isLoading}
        cssOverride={override}
        size={20}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
