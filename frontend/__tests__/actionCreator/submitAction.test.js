import moxios from 'moxios';
import { makeMockStore } from '../../Utils/integration_utils';

// Import actions to test
import { submitData, retrieveSession } from '../../src/redux/actions/submitAction';

// Import action types
import {
	IS_SUBMITTING,
	UPDATE_UID,
	UPDATE_WORKER_QUEUE_STATUS,
	SUBMIT_SUCCESS,
	IS_ANALYSIS_SUBMIT,
	IS_RETRIEVE_SUBMIT,
	UPDATE_SESSION_ID,
	SUBMIT_FAIL,
} from '../../src/redux/types/types'

describe('Testing submitAction', () => {
	describe('Testing "submitData" action', () => {
		let store;

		beforeEach(() => {
			moxios.install();
			store = makeMockStore({});
		})

		afterEach(() => {
			moxios.uninstall();
		});

		it('Should dispatch correct actions on successful POST request', () => {
			const sampleFormData = new FormData();
			const sampleUid = '1234'
			const sampleEndpoint = '/endpoint'
			sampleFormData.append('uuid', sampleUid);

			moxios.wait(() => {
				const request = moxios.requests.mostRecent();
				request.respondWith({
					status: 200,
					response: "Success!"
				})
			});

			const expectedActions = [
				{ type: IS_SUBMITTING },
				{ type: UPDATE_UID, payload: {uid: sampleUid} },
				{ type: UPDATE_WORKER_QUEUE_STATUS, payload: {isWorkerQueued: true} },
				{ type: SUBMIT_SUCCESS },
				{ type: IS_ANALYSIS_SUBMIT },
				{ type: UPDATE_SESSION_ID, payload: {inputSessionId: ''} },
			]

			return store.dispatch(submitData(sampleFormData, sampleEndpoint)).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});

		it('Should handle expectedly failed request', () => {
			const sampleFormData = new FormData();
			const sampleUid = '1234'
			const sampleEndpoint = '/endpoint'
			sampleFormData.append('uuid', sampleUid);

			moxios.wait(() => {
				const request = moxios.requests.mostRecent();
				request.reject({
					status: 400,
					response: "User made mistake!"
				})
			});

			const expectedActions = [
				{ type: IS_SUBMITTING },
				{ type: SUBMIT_FAIL },
			]

			return store.dispatch(submitData(sampleFormData, sampleEndpoint)).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});
	});

	describe('Testing "retrieveSession" action', () => {
		let store;

		beforeEach(() => {
			moxios.install();
			store = makeMockStore({});
		})

		afterEach(() => {
			moxios.uninstall();
		});

		it('Should handle successful request', () => {
			const sampleFormData = new FormData();
			const sampleUid = '1234'
			const sampleEndpoint = '/endpoint'
			sampleFormData.append('session_id', sampleUid);

			moxios.wait(() => {
				const request = moxios.requests.mostRecent();
				request.respondWith({
					status: 200,
					response: "Success!"
				})
			});

			const expectedActions = [
				{ type: UPDATE_UID, payload: {uid: sampleUid} },
				{ type: IS_RETRIEVE_SUBMIT },
			]

			return store.dispatch(retrieveSession(sampleFormData, sampleEndpoint)).then(() => {
				expect(store.getActions()).toEqual(expectedActions)
			})
		});

	});

})
