import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LanguageDetail } from './LanguageDetail';

@Index('language_pkey', ['id'], { unique: true })
@Entity('language', { schema: 'public' })
export class Language {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: false })
  name: string | null;

  @OneToMany(() => LanguageDetail, (languageDetail) => languageDetail.language)
  languageDetails: LanguageDetail[];
}
