import { render } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';

describe('LoginForm', () => {
    it('should render correctly', () => {
        const container = render(<LoginForm />);
        expect(container).toBeTruthy();
    });
}); 