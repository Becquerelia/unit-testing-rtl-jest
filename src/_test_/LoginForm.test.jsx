import { render, cleanup } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);

    beforeAll(()=> {
        render(<LoginForm />);
    });

    it('should display two inputs', () => {
        render
    })
}); 