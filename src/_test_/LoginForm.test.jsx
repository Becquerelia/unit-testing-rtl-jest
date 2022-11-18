import { render, cleanup, screen } from '@testing-library/react';
import { LoginForm } from '../pages/LoginForm';

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);

    beforeAll(()=> {
        render(<LoginForm />);
    });

    it('should display two inputs', () => {
        expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
    });
}); 