package com.example.JavaApp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Username must not be blank.")
    private String username;

    @NotBlank(message = "Password must not be blank.")
    private String password;
}
