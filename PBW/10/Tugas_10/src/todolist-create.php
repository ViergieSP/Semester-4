<?php
    require '../config/koneksi.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user_id = 1;

        $title = $_POST['title'];
        $description = $_POST['description'];
        $deadline = $_POST['deadline'];
        $priority = $_POST['priority'];

        $query = "INSERT INTO todolists (user_id, title, description, deadline, priority) 
        VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "issss", $user_id, $title, $description, $deadline, $priority);

        if(mysqli_stmt_execute($stmt)) {
            header("Location: ../index.php?success=created");
            exit();
        } else {
            echo "Error: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    }