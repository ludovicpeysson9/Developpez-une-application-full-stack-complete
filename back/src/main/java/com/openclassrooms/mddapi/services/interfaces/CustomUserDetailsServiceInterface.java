package com.openclassrooms.mddapi.services.interfaces;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface CustomUserDetailsServiceInterface extends UserDetailsService  {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    UserDetails loadUserById(Integer id) throws UsernameNotFoundException;
}
