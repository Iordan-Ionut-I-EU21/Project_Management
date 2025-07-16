package com.example.backend.Configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;

public class BlobSerializer extends JsonSerializer<Blob> {
    @Override
    public void serialize(Blob blob, JsonGenerator gen, SerializerProvider serializers)
            throws IOException {
        try (InputStream inputStream = blob.getBinaryStream()) {
            String text = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            gen.writeString(text);
        } catch (SQLException e) {
            gen.writeNull();
        }
    }
}
