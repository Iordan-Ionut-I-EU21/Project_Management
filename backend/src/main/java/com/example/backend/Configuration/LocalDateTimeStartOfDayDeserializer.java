package com.example.backend.Configuration;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeStartOfDayDeserializer   extends JsonDeserializer<LocalDateTime> {

	@Override
	public LocalDateTime deserialize(com.fasterxml.jackson.core.JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
		String value = jsonParser.getText().trim();

		try {
			// Try parsing as full LocalDateTime
			return LocalDateTime.parse(value, DateTimeFormatter.ISO_DATE_TIME);
		} catch (Exception e) {
			// Fallback: if it's only a date, convert it to start of day
			return LocalDate.parse(value, DateTimeFormatter.ISO_DATE).atStartOfDay();
		}	}
}