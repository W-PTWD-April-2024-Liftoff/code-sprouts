package org.launchcode.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegistrationFormDTO extends org.launchcode.models.dto.LoginFormDTO {
    //inherits fields from loginformdto so this is the third field
    @NotNull(message = "Password is required.")
    @NotBlank(message = "Password is required.")
    @Size(min = 8, max = 30, message = "Password must be 3-30 characters long.")
    private String verifyPassword;

    //to use in template and controller
    public String getVerifyPassword() {
        return verifyPassword;
    }
    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }
}
