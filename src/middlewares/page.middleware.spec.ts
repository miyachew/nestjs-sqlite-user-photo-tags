import { Test, TestingModule } from '@nestjs/testing';

import { PageMiddleware } from './page.middleware';

describe('Page Middleware', () => {
    const middleware: PageMiddleware = new PageMiddleware();

    afterEach(async () => {
        jest.restoreAllMocks();
    });

    it('Test no limit and offset in request, limit and offset set to default', async () => {
        const mockRequest: any = {
            query: {}
        };
        const mockResponse: any = jest.fn();
        const mockNextFunction = jest.fn();

        middleware.use(mockRequest, mockResponse, mockNextFunction);

        expect(mockRequest.query.limit).toBe(10);
        expect(mockRequest.query.offset).toBe(0);
        expect(mockNextFunction).toBeCalled();
    });

    it('Test limit & offset with non-number string,limit and offset set to default', async () => {
        const mockRequest: any = {
            query: {
                limit: "abc",
                offset: "def"
            }
        };
        const mockResponse: any = jest.fn();
        const mockNextFunction = jest.fn();

        middleware.use(mockRequest, mockResponse, mockNextFunction);

        expect(mockRequest.query.limit).toBe(10);
        expect(mockRequest.query.offset).toBe(0);
        expect(mockNextFunction).toBeCalled();
    });

    it('Test limit & offset with number string, limit and offset set to integer', async () => {
        const mockRequest: any = {
            query: {
                limit: "15",
                offset: "5"
            }
        };
        const mockResponse: any = jest.fn();
        const mockNextFunction = jest.fn();

        middleware.use(mockRequest, mockResponse, mockNextFunction);

        expect(mockRequest.query.limit).toBe(15);
        expect(mockRequest.query.offset).toBe(5);
        expect(mockNextFunction).toBeCalled();
    });

    it('Test limit & offset with float, limit and offset set to default', async () => {
        const mockRequest: any = {
            query: {
                limit: 1.43,
                offset: 5
            }
        };
        const mockResponse: any = jest.fn();
        const mockNextFunction = jest.fn();

        middleware.use(mockRequest, mockResponse, mockNextFunction);

        expect(mockRequest.query.limit).toBe(10);
        expect(mockRequest.query.offset).toBe(5);
        expect(mockNextFunction).toBeCalled();
    });

    it('Test limit & offset with integer, value should not change', async () => {
        const mockRequest: any = {
            query: {
                limit: 20,
                offset: 2
            }
        };
        const mockResponse: any = jest.fn();
        const mockNextFunction = jest.fn();

        middleware.use(mockRequest, mockResponse, mockNextFunction);

        expect(mockRequest.query.limit).toBe(20);
        expect(mockRequest.query.offset).toBe(2);
        expect(mockNextFunction).toBeCalled();
    });

});