interface IConvertableProperties {
  [properties: string]: {
    [key: string]: any;
  };
}

class ChangeableType {
  private convertableKeys: IConvertableProperties;
  private instance: any;

  protected setInstance(instance) {
    this.instance = instance;
  }

  protected setConvertableKey(convertableKeys: IConvertableProperties) {
    this.convertableKeys = convertableKeys;
  }

  private isConvertableKey(key) {
    return !!this.convertableKeys[key];
  }

  private findKeyType = (key, valueType) => {
    let returnKey = valueType;
    Object.keys(this.convertableKeys[key]).forEach((keyType) => {
      if (this.convertableKeys[key][keyType] == valueType) {
        returnKey = keyType;
      }
    });

    return returnKey;
  };

  toEntities(instance?) {
    return this.convert(instance || this.instance, "entities");
  }

  toRaw(instance?) {
    return this.convert(instance || this.instance, "raw");
  }

  protected convert(entities, type: "entities" | "raw") {
    let converted = {};
    Object.keys(entities).forEach((key) => {
      if (this.isConvertableKey(key)) {
        const valueType = entities[key];
        if (type == "entities") {
          converted[key] = this.findKeyType(key, valueType);
        } else {
          converted[key] = this.convertableKeys[key][valueType];
        }
      } else {
        converted[key] = entities[key];
      }
    });

    return converted;
  }
}

export default ChangeableType;
