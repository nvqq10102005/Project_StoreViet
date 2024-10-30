package com.project.shopapp.controllers;

import com.project.shopapp.components.LocalizationUtils;
import com.project.shopapp.models.User;
import com.project.shopapp.responses.LoginResponse;
import com.project.shopapp.responses.RegisterResponse;
import com.project.shopapp.services.IUserService;
import com.project.shopapp.utils.MessageKeys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.shopapp.dtos.*;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;
    private final LocalizationUtils localizationUtils;
    @PostMapping("/register")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result
            ) {
        try{
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            if(!userDTO.getPassword().equals(userDTO.getRetypePassword())){
                return ResponseEntity.badRequest().body(localizationUtils.getLocalizedMessage(MessageKeys.PASSWORD_NOT_MATCH));
            }
            User user = userService.createUser(userDTO);
            return ResponseEntity.ok(user);
        }  catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
//@PostMapping("/register")
////can we register an "admin" user ?
//public ResponseEntity<RegisterResponse> createUser(
//        @Valid @RequestBody UserDTO userDTO,
//        BindingResult result
//) {
//    RegisterResponse registerResponse = new RegisterResponse();
//
//    if (result.hasErrors()) {
//        List<String> errorMessages = result.getFieldErrors()
//                .stream()
//                .map(FieldError::getDefaultMessage)
//                .toList();
//
//        registerResponse.setMessage(errorMessages.toString());
//        return ResponseEntity.badRequest().body(registerResponse);
//    }
//
//    if (!userDTO.getPassword().equals(userDTO.getRetypePassword())) {
//        registerResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.PASSWORD_NOT_MATCH));
//        return ResponseEntity.badRequest().body(registerResponse);
//    }
//
//    try {
//        User user = userService.createUser(userDTO);
//        registerResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.REGISTER_SUCCESSFULLY));
//        registerResponse.setUser(user);
//        return ResponseEntity.ok(registerResponse);
//    } catch (Exception e) {
//        registerResponse.setMessage(e.getMessage());
//        return ResponseEntity.badRequest().body(registerResponse);
//    }
//}
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(
//            @Valid @RequestBody UserLoginDTO userLoginDTO, HttpServletRequest request) {
//        // Kiểm tra thông tin đăng nhập và sinh token
//
//        try {
//            String token = userService.login(userLoginDTO.getPhoneNumber(), userLoginDTO.getPassword());
//            Locale locale = localeResolver.resolveLocale(request);
//            return ResponseEntity.ok(LoginResponse.builder()
//                    .message(messageSource.getMessage("user.login.login_successfully",null,locale))
//                    .token(token).build());
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(LoginResponse.builder()
//                            .message(String.format("Login failed: %s",e.getMessage()))
//                    .build());
//        }
//        // Trả về token trong response
//
//    }
@PostMapping("/login")
public ResponseEntity<LoginResponse> login(
        @Valid @RequestBody UserLoginDTO userLoginDTO
) {
    // Kiểm tra thông tin đăng nhập và sinh token
    try {
        String token = userService.login(
                userLoginDTO.getPhoneNumber(),
                userLoginDTO.getPassword(),
                userLoginDTO.getRoleId()
        );
        // Trả về token trong response
        return ResponseEntity.ok(LoginResponse.builder()
                .message(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_SUCCESSFULLY))
                .token(token)
                .build());
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(
                LoginResponse.builder()
                        .message(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_FAILED, e.getMessage()))
                        .build()
        );
    }
}
}
