using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    /// <inheritdoc />
    public partial class MovieMovieList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_MovieList_MovieListId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_MovieListId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieListId",
                table: "Movies");

            migrationBuilder.CreateTable(
                name: "MovieMovieList",
                columns: table => new
                {
                    MovieId = table.Column<string>(type: "text", nullable: false),
                    MovieListId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieMovieList", x => new { x.MovieId, x.MovieListId });
                    table.ForeignKey(
                        name: "FK_MovieMovieList_MovieList_MovieListId",
                        column: x => x.MovieListId,
                        principalTable: "MovieList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieMovieList_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieMovieList_MovieListId",
                table: "MovieMovieList",
                column: "MovieListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieMovieList");

            migrationBuilder.AddColumn<Guid>(
                name: "MovieListId",
                table: "Movies",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_MovieListId",
                table: "Movies",
                column: "MovieListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_MovieList_MovieListId",
                table: "Movies",
                column: "MovieListId",
                principalTable: "MovieList",
                principalColumn: "Id");
        }
    }
}
