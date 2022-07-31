import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659254553837 implements MigrationInterface {
    name = 'init1659254553837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" character varying NOT NULL, CONSTRAINT "PK_8435921763b8a56c98b3700773d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" character varying NOT NULL, CONSTRAINT "PK_a2808c56d3dc5d8882f9495e63d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" character varying NOT NULL, CONSTRAINT "PK_8d34ad5c55c7d5448fad8c4ced7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorite_tracks"`);
        await queryRunner.query(`DROP TABLE "favorite_artists"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "favorite_albums"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
