import { IMove, IPostUser, IUser, ILogIn, IPostRoutine } from './interface';

// const baseUrl = 'http://192.168.1.234:3000';
const baseUrl = 'http://10.10.22.29:3000';

function getCodeOfPoints(): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points`)
    .then(res => res.json());
}

function getApparatusMoves(apparatus: string): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points/${apparatus}`)
    .then(res => res.json());
}

function addUser(data: IPostUser): Promise<IUser | object> {
  return fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
}

function logIn(data: ILogIn): Promise<IUser | object> {
  return fetch(`${baseUrl}/log_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json());
}

function postRoutine(data: IPostRoutine): Promise<IPostRoutine | object> {
  return fetch(`${baseUrl}/add_routine/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json());
}

function getRoutines(name: string): Promise<IPostRoutine[]> {
  return fetch(`${baseUrl}/get_routines/${name}`)
    .then(res => {
      return res.json()
    })
    .catch(res => {
      console.log('error', res)
    })
}

function addToCompRoutines(data: any, name: string): Promise<IPostRoutine[]> {
  return fetch(`${baseUrl}/add_comp_routine/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json());
}

function getCompRoutines(name: string): Promise<IPostRoutine[]> {
  return fetch(`${baseUrl}/comp_routines/${name}`)
    .then(res => res.json());
}

export default {
  getCodeOfPoints,
  getApparatusMoves,
  addUser,
  logIn,
  postRoutine,
  getRoutines,
  addToCompRoutines,
  getCompRoutines
}