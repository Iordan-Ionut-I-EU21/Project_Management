package com.example.backend.Generate;

import java.security.SecureRandom;
import java.util.Random;

public class VinGenerator {
	private static final String VIN_CHARS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"; // Excludes I, O, Q
	private static final int VIN_LENGTH = 17;
	private static final SecureRandom RANDOM = new SecureRandom();
	public static String generateVin() {
		StringBuilder vin = new StringBuilder(VIN_LENGTH);
		for (int i = 0; i < VIN_LENGTH; i++) {
			vin.append(VIN_CHARS.charAt(RANDOM.nextInt(VIN_CHARS.length())));
		}
		return vin.toString();
	}
}
