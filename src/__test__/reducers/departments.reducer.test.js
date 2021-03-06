import expect from 'expect';

import departmentsReducer from '../../_reducers/departments.reducer';
import departmentDetailReducer from '../../_reducers/departmentDetail.reducer';
import departments from '../../_mock/departments';
import constants from '../../_constants';

const {
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAILURE,
  RESET_STATUS_MESSAGE,
  LOAD_DEPARTMENT_DETAIL_REQUEST,
  LOAD_DEPARTMENT_DETAIL_SUCCESS,
  LOAD_DEPARTMENT_DETAIL_FAILURE
} = constants;

const departmentState = {
  departmentsCount: 0,
  departmentsList: [],
  isLoading: false,
  error: ''
};

const departmentDetailState = {
  details: {},
  isLoading: false,
  error: ''
};

const action = {
  payload: departments.results
};


describe('Department Reducer tests', () => {
  describe('Load Department Reducer', () => {
    it('should return initial state when there is no action', () => {
      expect(departmentsReducer(departmentState, {})).toEqual(departmentState);
    });
    it('should handle LOAD_DEPARTMENTS_REQUEST', () => {
      action.type = LOAD_DEPARTMENTS_REQUEST;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        isLoading: true
      }));
    });

    it('should handle LOAD_DEPARTMENTS_SUCCESS', () => {
      action.type = LOAD_DEPARTMENTS_SUCCESS;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        departmentsCount: 2,
        departmentsList: action.payload,
        isLoading: false
      }));
    });

    it('should handle LOAD_DEPARTMENTS_FAILURE', () => {
      action.type = LOAD_DEPARTMENTS_FAILURE;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        isLoading: false
      }));
    });
  });

  describe('Create Department Reducer', () => {
    it('should handle CREATE_DEPARTMENT_REQUEST', () => {
      action.type = CREATE_DEPARTMENT_REQUEST;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        isLoading: true
      }));
    });

    it('should handle CREATE_DEPARTMENT_SUCCESS', () => {
      action.type = CREATE_DEPARTMENT_SUCCESS;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        isLoading: false,
        createFailure: '',
        createSuccess: 'Department added successfully.'
      }));
    });

    it('should handle CREATE_DEPARTMENT_FAILURE', () => {
      expect(departmentsReducer(departmentState, {
        type: CREATE_DEPARTMENT_FAILURE,
        payload: 'Could not create department.'
      }))
        .toEqual(expect.objectContaining({
          isLoading: false,
          createFailure: 'Could not create department.',
          createSuccess: ''
        }));
    });

    it('should handle RESET_STATUS_MESSAGE', () => {
      action.type = RESET_STATUS_MESSAGE;
      expect(departmentsReducer(departmentState, action)).toEqual(expect.objectContaining({
        error: '',
        successMessage: '',
        updateError: '',
        updateSuccess: ''
      }));
    });
  });

  describe('Department Detail Reducer', () => {
    it('should handle LOAD_DEPARTMENT_DEATIL_REQUEST', () => {
      action.type = LOAD_DEPARTMENT_DETAIL_REQUEST;
      ([action.payload] = departments.results);
      expect(departmentDetailReducer(departmentDetailState, action))
        .toEqual(expect.objectContaining({
          isLoading: true
        }));
    });

    it('should handle LOAD_DEPARTMENT_DETAIL_SUCCESS', () => {
      action.type = LOAD_DEPARTMENT_DETAIL_SUCCESS;
      ([action.payload] = departments.results);
      expect(departmentDetailReducer(departmentDetailState, action))
        .toEqual(expect.objectContaining({
          details: departments.results[0],
          isLoading: false
        }));
    });

    it('should handle LOAD_DEPARTMENT_DETAIL_FAILURE', () => {
      action.type = LOAD_DEPARTMENT_DETAIL_FAILURE;
      action.payload = 'Error';
      expect(departmentDetailReducer(departmentDetailState, action))
        .toEqual(expect.objectContaining({
          isLoading: false,
          error: 'Error'
        }));
    });
  });
});
