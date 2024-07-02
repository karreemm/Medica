using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataBaseProject.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "deleteduser",
                columns: table => new
                {
                    uid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    firstname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    lastname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    address = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    github = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    linkedin = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    profileimage = table.Column<string>(type: "text", nullable: true),
                    role = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    bdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    insta = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    facebook = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    twitter = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("deleteduser_pkey", x => x.uid);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    uid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    firstname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    lastname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    address = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    github = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    linkedin = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    profileimage = table.Column<string>(type: "text", nullable: true),
                    role = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    gender = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    bdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    insta = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    facebook = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    twitter = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("User_pkey", x => x.uid);
                });

            migrationBuilder.CreateTable(
                name: "activity",
                columns: table => new
                {
                    ac_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    uid = table.Column<int>(type: "integer", nullable: true),
                    action = table.Column<string>(type: "text", nullable: true),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    toid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("activity_pk", x => x.ac_id);
                    table.ForeignKey(
                        name: "activity_user_uid_fk",
                        column: x => x.uid,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "activity_user_uid_fk_2",
                        column: x => x.toid,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "appointment",
                columns: table => new
                {
                    apid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    did = table.Column<int>(type: "integer", nullable: true),
                    pid = table.Column<int>(type: "integer", nullable: false),
                    apdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    accept = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("appointment_pk", x => x.apid);
                    table.ForeignKey(
                        name: "appointment_user_uid_fk",
                        column: x => x.did,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk",
                        column: x => x.pid,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "phistory",
                columns: table => new
                {
                    patient_id = table.Column<int>(type: "integer", nullable: false),
                    weight = table.Column<float>(type: "real", nullable: true),
                    height = table.Column<float>(type: "real", nullable: true),
                    smoking = table.Column<bool>(type: "boolean", nullable: true),
                    hospital_stay = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("phistory_pk", x => x.patient_id);
                    table.ForeignKey(
                        name: "phistory_user_uid_fk",
                        column: x => x.patient_id,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "scan",
                columns: table => new
                {
                    scan_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    doc_id = table.Column<int>(type: "integer", nullable: true),
                    p_id = table.Column<int>(type: "integer", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    image = table.Column<string>(type: "text", nullable: true),
                    accept = table.Column<bool>(type: "boolean", nullable: true),
                    response = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("scan_pk", x => x.scan_id);
                    table.ForeignKey(
                        name: "scan_user_uid_fk",
                        column: x => x.doc_id,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "scan_user_uid_fk_2",
                        column: x => x.p_id,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "surgery",
                columns: table => new
                {
                    sid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    did = table.Column<int>(type: "integer", nullable: true),
                    pid = table.Column<int>(type: "integer", nullable: true),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    sdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    cost = table.Column<int>(type: "integer", nullable: true),
                    op_room = table.Column<int>(type: "integer", nullable: true),
                    duration = table.Column<TimeSpan>(type: "interval", nullable: true),
                    Nid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("sid", x => x.sid);
                    table.ForeignKey(
                        name: "surgery_user_uid_fk",
                        column: x => x.did,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "surgery_user_uid_fk_2",
                        column: x => x.pid,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "disease",
                columns: table => new
                {
                    patient_id = table.Column<int>(type: "integer", nullable: false),
                    disease = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("disease_pk", x => x.patient_id);
                    table.ForeignKey(
                        name: "disease_phistory_patient_id_fk",
                        column: x => x.patient_id,
                        principalTable: "phistory",
                        principalColumn: "patient_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "sugery_nurses",
                columns: table => new
                {
                    nid = table.Column<int>(type: "integer", nullable: false),
                    sid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("sugery_nurses_pk", x => new { x.nid, x.sid });
                    table.ForeignKey(
                        name: "sugerynurses_surgery_sid_fk",
                        column: x => x.sid,
                        principalTable: "surgery",
                        principalColumn: "sid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "sugerynurses_user_uid_fk",
                        column: x => x.nid,
                        principalTable: "User",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "activity");

            migrationBuilder.DropTable(
                name: "appointment");

            migrationBuilder.DropTable(
                name: "deleteduser");

            migrationBuilder.DropTable(
                name: "disease");

            migrationBuilder.DropTable(
                name: "scan");

            migrationBuilder.DropTable(
                name: "sugery_nurses");

            migrationBuilder.DropTable(
                name: "phistory");

            migrationBuilder.DropTable(
                name: "surgery");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
