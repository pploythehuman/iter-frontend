import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import ItineraryTimeline from './ItineraryTimeline';

// Mock the implementation of `scrollIntoView`
window.HTMLElement.prototype.scrollIntoView = function() {};
window.scrollTo = jest.fn();


describe('ItineraryTimeline', () => {
  it('renders without crashing', () => {
    const itineraryData = [
      {
        id: '1',
        date: '2023-06-01',
        arrival_time: '10:00:00',
        leave_time: '11:00:00',
        place_name: 'Place 1',
        web_picture_urls: [],
        description: 'Place 1 description',
        contact: 'Place 1 contact',
        tags: [],
        travel_time: { car: '1 hour' },
      },
    ];

    function TestComponent() {
      const itineraryRefs = useRef<(HTMLDivElement | null)[]>([]);
      return (
        <ItineraryTimeline
          itineraryData={itineraryData}
          selectedDate={itineraryData[0].date}
          itineraryRefs={itineraryRefs}
          onDelete={() => {}}
        />
      );
    }

    render(<TestComponent />);

    const placeElements = screen.getAllByText(/Place 1/i);
    expect(placeElements.length).toBeGreaterThan(0);

  });
});
