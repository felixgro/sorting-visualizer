function* UIDGenerator() {
    let id = 0;

    while (true) {
        yield `uid-${id}`;
        id++;
    }
}

const uidGenerator = UIDGenerator();

export const generateUniqueId = (): string => uidGenerator.next().value as string;