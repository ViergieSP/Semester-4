<?php
    require '../config/koneksi.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $userId = 1;
        $id = $_POST['id'];
        $status = $_POST['status'];

        $query = "UPDATE todolists SET status = ? WHERE id = ? AND user_id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "sii", $status, $id, $userId);
        
        if(mysqli_stmt_execute($stmt)) {
            header("Location: ../index.php?success=updated");
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    } else {
        die("Error: " . mysqli_error($conn));
    }
?>