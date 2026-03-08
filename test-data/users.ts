export type TestEnv = 'qa' ;

const testEnv = (process.env.TEST_ENV as TestEnv) || 'qa';

const usersByEnv: Record<TestEnv, {
    oncologist: { username: string; password: string };
    radiologist: { username: string; password: string };
    invalidUser: { username: string; password: string };
  

}> = {
    qa: {
        oncologist: {
            username: 'dr.smith',
            password: 'oncologist123'
        },
        radiologist: {
            username: 'dr.jones',
            password: 'radiologist123'
        },
         invalidUser: {
            username: 'invalid_user',
            password: 'wrong_password',
        },

    },

};

export const users = usersByEnv[testEnv];
