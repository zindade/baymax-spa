package com.codeforall.online.baymax.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Objects;
import java.util.UUID;

/**
 * A generic model domain entity to be used as a base for concrete types of models
 */
@MappedSuperclass
public class AbstractModel implements Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Version
    private Integer version;

    @CreationTimestamp
    private Timestamp creationTime;

    @UpdateTimestamp
    private Timestamp updateTime;

    /* UUID stands for Universally Unique Identifier.
    It is a specific form of identifier which can be safely deemed
    unique for most practical purposes, for example differentiate elements in a Set */
    @Transient
    private UUID uuid = UUID.randomUUID();

    /**
     * @see Model#getId()
     */
    @Override
    public int getId() {
        return id;
    }

    /**
     * Get the version
     * @return the version
     */
    public int getVersion() {
        return version;
    }

    /**
     * Get the creation time
     * @return the creation time
     */
    public Timestamp getCreationTime() {
        return creationTime;
    }

    /**
     * Get the update time
     * @return the update time
     */
    public Timestamp getUpdateTime() {
        return updateTime;
    }

    /**
     * Get the Universally Unique Identifier
     * @return UUID
     */
    public UUID getUuid() {
        return uuid;
    }

    /**
     * @see Model#setId(int)
     */
    @Override
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Set the version
     * @param version to set
     */
    public void setVersion(int version) {
        this.version = version;
    }

    /**
     * Set the creation time
     * @param creationTime to set
     */
    public void setCreationTime(Timestamp creationTime) {
        this.creationTime = creationTime;
    }

    /**
     * Set the update time
     * @param updateTime to set
     */
    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * Set the Universally Unique Identifier
     * @param uuid
     */
    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    /**
     * @see Object#equals(Object)
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AbstractModel that)) {
            return false;
        }
        return Objects.equals(version, that.version) && Objects.equals(creationTime, that.creationTime)
                && Objects.equals(updateTime, that.updateTime) && Objects.equals(uuid, that.uuid);
    }

    /**
     * @see Object#hashCode()
     */
    @Override
    public int hashCode() {
        return Objects.hash(version, creationTime, updateTime, uuid);
    }
}
