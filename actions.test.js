import {getEmployeeDetail} from './actions';

function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

  describe('getEmployeeDetail', () => {
      it('fetches details', async () => {
           global.fetch = mockFetch({
               data: {}
          });

        //global.fetch = mockFetch({});

          const dispatch = jest.fn();

          await getEmployeeDetail()(dispatch);
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0][0]).toEqual({type: 'GET_DETAILS_BEGIN'});
          expect(dispatch.mock.calls[1][0]).toEqual({type:"GET_DETAILS_SUCCESS",empDetails: { }})

      })
  })
  

  