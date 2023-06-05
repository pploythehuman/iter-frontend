jest.doMock('axios', () => {
    const mockAxios: any = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(() => mockAxios),
      interceptors: {
        response: {
          use: jest.fn(),
        },
        request: {
          use: jest.fn(),
        },
      },
    };
    return mockAxios;
});

import { checkEventOverlap } from '../CalendarComponent';

describe('checkEventOverlap', () => {
    const testCases = [
        {
            title: 'should return empty list since there is no events',
            events: [],
            expectedColors: [],
        },
        {
            title: 'should detect no overlap for events that do not overlap',
            events: [
                { start: '2023-06-01T08:00', end: '2023-06-01T09:00' },
                { start: '2023-06-01T09:30', end: '2023-06-01T10:00' },
            ],
            expectedColors: [undefined, undefined],
        },
        {
            title: 'should detect overlap since there are some overlapping time',
            events: [
                { start: '2023-06-01T08:00', end: '2023-06-01T09:30' }, 
                { start: '2023-06-01T09:00', end: '2023-06-01T10:00' }
            ],
            expectedColors: ['#ff4d4f', '#ff4d4f'],
        },
        {
            title: 'should detect overlap since first event is a subset of the second event',
            events: [
                { start: '2023-06-01T09:00', end: '2023-06-01T10:00' }, 
                { start: '2023-06-01T09:00', end: '2023-06-01T11:00' }
            ],
            expectedColors: ['#ff4d4f', '#ff4d4f'],
        },
        // {
        //     title: 'no overlap with colors',
        //     events: [
        //         { start: '2023-06-01T08:00', end: '2023-06-01T09:00', color: '#abc' }, 
        //         { start: '2023-06-01T09:30', end: '2023-06-01T10:00', color: '#def' }
        //     ],
        //     expectedColors: ['#abc', '#def'],
        // },
        {
            title: 'overlap with colors',
            events: [
                { start: '2023-06-01T08:00', end: '2023-06-01T09:30', color: '#abc' }, 
                { start: '2023-06-01T09:00', end: '2023-06-01T10:00', color: '#def' }
            ],
            expectedColors: ['#ff4d4f', '#ff4d4f'],
        },
    ];

    testCases.forEach(({title, events, expectedColors}) => {
        it(title, () => {
            const result = checkEventOverlap(events);

            expectedColors.forEach((expectedColor: any, index: any) => {
                if (expectedColor) {
                    // expect the event to be marked as overlapping (color is red)
                    expect(result[index].color).toEqual(expectedColor);
                } else {
                    // expect the event to not be marked as overlapping (color is not red)
                    expect(result[index].color).not.toEqual('#ff4d4f');
                }
            });
        });
    });
});
