import { IMove, IPostUser, IUser } from './interface';

const baseUrl = 'http://192.168.1.208:3000';

function getCodeOfPoints(): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points`)
    .then(res => res.json());
}

function getApparatusMoves(apparatus: string): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points/${apparatus}`)
    .then(res => res.json());
}

function addUser(data: IPostUser): Promise<IUser> {
  return fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json());
}

function checkEmail(data: IPostUser): Promise<IUser[]> {
  return fetch(`${baseUrl}/check_email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json());
}

export default {
  getCodeOfPoints,
  getApparatusMoves,
  addUser,
  checkEmail
}