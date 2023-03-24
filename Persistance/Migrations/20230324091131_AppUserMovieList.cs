using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AppUserMovieList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MovieListId",
                table: "Movies",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MovieList",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieList", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserMovieList",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    MovieListId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserMovieList", x => new { x.AppUserId, x.MovieListId });
                    table.ForeignKey(
                        name: "FK_AppUserMovieList_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserMovieList_MovieList_MovieListId",
                        column: x => x.MovieListId,
                        principalTable: "MovieList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_MovieListId",
                table: "Movies",
                column: "MovieListId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserMovieList_MovieListId",
                table: "AppUserMovieList",
                column: "MovieListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_MovieList_MovieListId",
                table: "Movies",
                column: "MovieListId",
                principalTable: "MovieList",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_MovieList_MovieListId",
                table: "Movies");

            migrationBuilder.DropTable(
                name: "AppUserMovieList");

            migrationBuilder.DropTable(
                name: "MovieList");

            migrationBuilder.DropIndex(
                name: "IX_Movies_MovieListId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieListId",
                table: "Movies");
        }
    }
}
