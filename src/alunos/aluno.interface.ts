import { Document, Types } from 'mongoose';

export interface IAluno extends Document{
  nome: string;
  matricula: string;
  turmaId: string;
  responsavelId: string;
}