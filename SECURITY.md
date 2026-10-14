# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in NP-Pinning, please **do not** open a public issue. Instead, please report it privately by emailing the maintainers.

**Contact:** security@example.com (Replace with actual security contact)

Please include:

- Description of the vulnerability
- Steps to reproduce (if possible)
- Potential impact
- Any suggested fixes

We will acknowledge receipt within 48 hours and provide updates as we investigate and work on a fix.

## Security Considerations

### Client-Side Application

This is a **client-side prototype** running entirely in the browser. It does not:

- Connect to a backend server
- Store data on a server
- Handle real credentials or sensitive user data
- Process or transmit personal information

### What This Means

- **No server-side vulnerabilities**: No SQL injection, CSRF, XXS from backend
- **No authentication**: This is a prototype; there's no real login system
- **No data persistence**: Data is stored in memory; refresh clears everything
- **No external API calls**: The app is fully self-contained

### Known Limitations

1. **Demo inputs are hardcoded**: Phone numbers like `9811111111` trigger demo states for prototyping
2. **No input sanitization**: Since there's no backend, HTML/script injection isn't a concern
3. **No encryption**: Data in `localStorage` (if used) is not encrypted
4. **Browser-dependent security**: Relies on browser security model (CSP, same-origin policy)

### Best Practices for Developers

- **Do not use this prototype with real user data**: It's not designed for production
- **Do not extend with real authentication**: This would require significant security hardening
- **Do not store sensitive information**: The app is not secure for production use
- **Test before production**: If converting to a real app, conduct a full security audit

## Dependency Security

### External Resources

This project loads:

- **Google Fonts**: For typography (Google Sans Flex, Rubik, Roboto)
- **Figma assets**: Icons and images exported from Figma

Both are loaded over HTTPS and cached by browsers.

### No NPM Dependencies

This project has **zero npm dependencies**, reducing attack surface and supply-chain risk.

## Browser Compatibility

Security depends on your browser's implementation:

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+) handle CSP and XSS protections
- Older browsers may lack some security features
- Use the latest stable browser version

## Privacy

This prototype:

- Does not collect analytics or tracking data
- Does not require a backend server
- Does not store data remotely
- Does not access device permissions (camera, microphone, location)

All data remains on your device.

## Responsible Disclosure

We follow responsible disclosure practices:

1. **Report privately**: Email security@example.com
2. **Allow time to fix**: We aim to patch vulnerabilities within 30 days
3. **Coordinated release**: We'll work with you on timing of public disclosure
4. **Credit**: We acknowledge responsible reporters in security advisories (unless they request anonymity)

## Security Roadmap

Future improvements if this becomes a production application:

- [ ] Full security audit by third-party firm
- [ ] Implement HTTPS/TLS
- [ ] Add CSRF tokens and validation
- [ ] Secure session management
- [ ] Rate limiting and DDoS protection
- [ ] Input validation and output encoding
- [ ] Access control and authorization
- [ ] Audit logging
- [ ] Incident response plan

## Version History

### Current Version

No security issues have been reported or fixed yet. This is a prototype.

### Reporting

See the [CONTRIBUTING.md](CONTRIBUTING.md) for general contribution guidelines. For security-specific issues, follow the process above.

---

Thank you for helping keep NP-Pinning secure!
