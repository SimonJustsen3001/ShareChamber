using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    /// <inheritdoc />
    public partial class PopularMovies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PopularMovie_Movies_MovieId",
                table: "PopularMovie");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PopularMovie",
                table: "PopularMovie");

            migrationBuilder.RenameTable(
                name: "PopularMovie",
                newName: "PopularMovies");

            migrationBuilder.RenameIndex(
                name: "IX_PopularMovie_MovieId",
                table: "PopularMovies",
                newName: "IX_PopularMovies_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PopularMovies",
                table: "PopularMovies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PopularMovies_Movies_MovieId",
                table: "PopularMovies",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PopularMovies_Movies_MovieId",
                table: "PopularMovies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PopularMovies",
                table: "PopularMovies");

            migrationBuilder.RenameTable(
                name: "PopularMovies",
                newName: "PopularMovie");

            migrationBuilder.RenameIndex(
                name: "IX_PopularMovies_MovieId",
                table: "PopularMovie",
                newName: "IX_PopularMovie_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PopularMovie",
                table: "PopularMovie",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PopularMovie_Movies_MovieId",
                table: "PopularMovie",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }
    }
}
