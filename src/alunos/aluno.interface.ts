import { Document, Types } from 'mongoose';

export interface IAluno extends Document{
  userId: string;
  matricula: string;
  turmaId: string;
  responsavelId: string;
}