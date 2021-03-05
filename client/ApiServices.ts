import { IMove } from './interface';

const baseUrl = 'http://192.168.1.208:3000';

function getCodeOfPoints(): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points`)
    .then(res => res.json());
}

function getApparatusMoves(apparatus: string): Promise<IMove[]> {
  return fetch(`${baseUrl}/code_of_points/${apparatus}`)
    .then(res => res.json());
}

export default {
  getCodeOfPoints,
  getApparatusMoves
}