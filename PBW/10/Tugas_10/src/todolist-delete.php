<?php
  require '../config/koneksi.php';

  if($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $userId = 1;

    $query = "DELETE FROM todolists WHERE id = ? AND user_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ii", $id, $userId);

    if(mysqli_stmt_execute($stmt)) {
        header("Location: ../completed.php?success=deleted");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    mysqli_stmt_close($stmt);
  } else {
    die("Error: " . mysqli_error($conn));
  }

?>