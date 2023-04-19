using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    /// <inheritdoc />
    public partial class MovieRatingsV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_AspNetUsers_AppUserId1",
                table: "MovieRating");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_Movies_MovieId1",
                table: "MovieRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating");

            migrationBuilder.DropIndex(
                name: "IX_MovieRating_AppUserId1",
                table: "MovieRating");

            migrationBuilder.DropIndex(
                name: "IX_MovieRating_MovieId1",
                table: "MovieRating");

            migrationBuilder.DropColumn(
                name: "AppUserId1",
                table: "MovieRating");

            migrationBuilder.DropColumn(
                name: "MovieId1",
                table: "MovieRating");

            migrationBuilder.RenameTable(
                name: "MovieRating",
                newName: "MovieRatings");

            migrationBuilder.AlterColumn<string>(
                name: "MovieId",
                table: "MovieRatings",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "MovieRatings",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRatings",
                table: "MovieRatings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRatings_AppUserId",
                table: "MovieRatings",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRatings_MovieId",
                table: "MovieRatings",
                column: "MovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRatings_AspNetUsers_AppUserId",
                table: "MovieRatings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRatings_Movies_MovieId",
                table: "MovieRatings",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRatings_AspNetUsers_AppUserId",
                table: "MovieRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRatings_Movies_MovieId",
                table: "MovieRatings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRatings",
                table: "MovieRatings");

            migrationBuilder.DropIndex(
                name: "IX_MovieRatings_AppUserId",
                table: "MovieRatings");

            migrationBuilder.DropIndex(
                name: "IX_MovieRatings_MovieId",
                table: "MovieRatings");

            migrationBuilder.RenameTable(
                name: "MovieRatings",
                newName: "MovieRating");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "MovieRating",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "MovieRating",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId1",
                table: "MovieRating",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieId1",
                table: "MovieRating",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRating_AppUserId1",
                table: "MovieRating",
                column: "AppUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_MovieRating_MovieId1",
                table: "MovieRating",
                column: "MovieId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_AspNetUsers_AppUserId1",
                table: "MovieRating",
                column: "AppUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_Movies_MovieId1",
                table: "MovieRating",
                column: "MovieId1",
                principalTable: "Movies",
                principalColumn: "Id");
        }
    }
}
