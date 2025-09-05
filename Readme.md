# Planning

**Requirements Gathering**

- Trip prices estimator
  - How grab calculate prices
  - Price differences on weekends/weekdays
- Transports available
  - LRT
  - MRT
  - KTM
  - Bus
  - Plane
  - Highways
- Routes
  - Best and easiest road to get somewhere
  - Famous places for easy navigating/sightseeing
    - For every location point such as Stops/etc.
- User Profiles
  - Economical background
  - Transport available

**Implementation**

- Backend API (Express JS + MongoDB)
  - API Enpoints
    - POST `/api/trips/estimate/:origin/:destination/:date`
    - GET `/api/trips/:id`
- Frontend Web (React)
- (TBC) Mobile - React Native

Testing

- Unit Testing
  - Grab Estimation price
  - Ability to point to correct location
  - Showing correct nearby places
- Integration Testing
  - UI / UX
  - Errors handled gracefully
  - Performance with low internet speed
  - Performance with low performance phones

**CORE SYSTEM PROCESSES**

1. Trip Cost Estimation
   1. May use CarPooling API ((https://rapidapi.com/zorkzone/api/carpoolin/playground) )
   2. User selects Origin + Destination + Date
   3. System gives available transport modes (car/bus/planes/train/grab)
   4. User selects Transport Mode
   5. System calculates estimation price
      1. Car - Calculate tolls + Fuel (according to average Malaysian fuel consumption km/l)
      2. Grab - Price offered by grab according to distance and peak hours
      3. Train - ticket price
      4. Plane - ticket price
         - Optional: Passport/clearance cost or something like that
   6. User choose accommodation (optional) & Return transport
   7. User can save this trip
2. Accommodation Cost Estimation
   1. May use Hotels API ((https://rapidapi.com/apidojo/api/hotels4) )
   2. User choose/scrolls lists of available accommodation
      1. sorted by price/hotel rating
3. User Comments/Forum (TBC)
   1. User can comment accomodations/transports
   2. Cheap meals places / Good

**DATABASE DESIGN**

- users
  - \_id
  - name
  - email
  - password (hashed / JSON-web token)
  - role
  - savedTrips
  - preferences
    - defaultTransport (nullable)
    - budgetType
- trips
  - \_id
  - userId
  - origin
  - destination
  - depart_date
  - return_date
  - transport_mode
  - accommodation
  - prices_breakdown
    - transport
  - estimated_cost
  - status (draft, saved, completed)
  - notes (user put down additional comments about the trip)
- accomodation_list
  - \_id
  - accommodation_name
  - location
  - room_type
    - price_record
      - 21-07-2024: RM75 per night
      - 22-07-2024: 63
    - benefits
      - 2 beds
      - parking available
  - Check-in time
  - Check-out time
  - Reviews
- transport_list
  - \_id
  - type
  - provider
  - origin
  - destination
  - schedules
    - usual available schedules
  - price
  - duration
  - instructions
