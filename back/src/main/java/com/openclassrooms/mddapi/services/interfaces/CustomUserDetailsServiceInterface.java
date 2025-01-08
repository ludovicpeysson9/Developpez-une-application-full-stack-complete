package com.openclassrooms.mddapi.services.interfaces;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface CustomUserDetailsServiceInterface extends UserDetailsService  {

    /**
     * Load a user by username.
     *
     * @param username the username of the user
     * @return the user details
     * @throws UsernameNotFoundException if the user is not found
     */
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    /**
     * Load a user by ID.
     *
     * @param id the ID of the user
     * @return the user details
     * @throws UsernameNotFoundException if the user is not found
     */
    UserDetails loadUserById(Integer id) throws UsernameNotFoundException;
}
